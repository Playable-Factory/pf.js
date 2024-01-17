export default class PhaserTween {
	constructor(game) {
		let tweens = require("phaser/src/tweens");
		game.stage.sys = {};
		game.stage.sys.events = {};
		game.stage.sys.events.on = () => { };
		game.stage.sys.events.once = () => { };
		game.stage.tweens = new tweens.TweenManager(game.stage);
		phaserPlusPlus.upgradePhaser(game.stage);
		let time = require("phaser/src/time");
		game.stage.time = new time.Clock(game.stage);

		game.ticker.add((delta) => {
			const msec = delta / PIXI.settings.TARGET_FPMS;
			if (game.stage.tweens) {
				game.stage.tweens.update(game.ticker.lastTime, msec);
			}
			if (game.stage.time) {
				game.stage.time.preUpdate();
				game.stage.time.update(game.ticker.lastTime, msec);
			}
		});
	}
}

class phaserPlusPlus {
	static upgradePhaser(scene) {
		/** @type {Phaser.Game} */
		// this.game = window.app.main.game;
		// this.game = globals.phaserGame;
		this.upgradeTweens(scene);
	}

	static upgradeTweens(scene) {
		let allScenes = [scene]
		// || this.game.scene.getScenes(false);

		let old_add = allScenes[0].tweens.__proto__.add;
		let disect = this._disectTweenConfig;

		allScenes[0].tweens.__proto__.add = function (conf) {
			//Disect config first
			let edited = disect(conf);
			let newConf = edited.config;
			let functions = edited.functions;

			let tween = old_add.call(this, newConf);
			if (edited.hasDynamic) {
				tween.on("update", function (tw, key, target) {
					if (key.substr(0, 9) !== "dynamic__") return;

					let trueKey = key.substr(9);
					target[trueKey] = functions[trueKey].lerp(
						functions[trueKey].getStart(target, trueKey, target[key], tw.targets.indexOf(target), tw.targets.length, tw),
						functions[trueKey].getEnd(target, trueKey, target[key], tw.targets.indexOf(target), tw.targets.length, tw),
						target[key]
					);
				});
			}
			return tween;
		};

		//console.log(allScenes[0].tweens.__proto__);
	}

	static _disectTweenConfig(conf) {
		let result = {
			config: {},
			functions: {},
		};

		for (let key in conf) {
			result.config[key] = conf[key];
		}

		let keysToDelete = [];

		for (let key in conf.props) {
			if (!conf.props[key].dynamic) continue;

			//Prepare dynamic props
			result.config.props["dynamic__" + key] = {
				value: {
					getStart: function () {
						return 0;
					},
					getEnd: function () {
						return 1;
					},
				},
			};
			result.functions[key] = {};

			for (let param in conf.props[key]) {
				if (param === "value") {
					result.functions[key].getStart = conf.props[key].value.getStart;
					result.functions[key].getEnd = conf.props[key].value.getEnd;
					if (conf.props[key].lerp) {
						result.functions[key].lerp = conf.props[key].lerp;
					} else {
						result.functions[key].lerp = function (start, end, n) {
							return (1 - n) * start + n * end;
						};
					}
				} else {
					result.config.props["dynamic__" + key][param] = conf.props[key][param];
				}
			}

			keysToDelete.push(key);
		}

		keysToDelete.forEach((key) => {
			delete result.config[key];
		});

		result.hasDynamic = keysToDelete.length > 0;

		return result;
	}
}