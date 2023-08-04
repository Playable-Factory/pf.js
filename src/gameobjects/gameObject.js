import pfGlobals from "pf.js/src/pfGlobals";

class GameObject {
	constructor(pixiObj, x = 0, y = 0) {
		this.pixiObj = pixiObj;

		this.baseWidth = this.pixiObj.width;
		this.baseHeight = this.pixiObj.height;

		this.setOrigin(0.5, 0.5);
		this.setPosition(x, y);

		this.setPivot = this.setOrigin;
	}

	addChild(child) {
		if (!child.pixiObj) {
			console.warn("Child does not have a pixi object");
			return;
		}
		this.pixiObj.addChild(child.pixiObj);
	}

	removeChild(child) {
		if (!child.pixiObj) {
			console.warn("Child does not have a pixi object");
			return;
		}
		this.pixiObj.removeChild(child.pixiObj);
	}

	remove() {
		this.pixiObj.parent.remove(this.pixiObj);
	}

	get children() {
		return this.pixiObj.children;
	}

	get parent() {
		return this.pixiObj.parent;
	}

	set visible(value) {
		this.pixiObj.visible = value;
	}

	get visible() {
		return this.pixiObj.visible;
	}

	set x(value) {
		this.pixiObj.x = value;
	}

	get x() {
		return this.pixiObj.x;
	}

	set y(value) {
		this.pixiObj.y = value;
	}

	get y() {
		return this.pixiObj.y;
	}

	///ROTATION
	set rotation(value) {
		this.pixiObj.rotation = value;
	}

	get rotation() {
		return this.pixiObj.rotation;
	}

	///ALPHA
	get alpha() {
		return this.pixiObj.alpha;
	}

	set alpha(value) {
		this.pixiObj.alpha = value;
	}
	///TINT
	get tint() {
		return this.pixiObj.tint;
	}

	set tint(value) {
		this.pixiObj.tint = value;
	}
	///TINT
	get blendMode() {
		return this.pixiObj.blendMode;
	}

	set blendMode(value) {
		this.pixiObj.blendMode = value;
	}
	///SCALE
	set scale(value) {
		this.pixiObj.scale.x = value;
		this.pixiObj.scale.y = value;
	}

	get scale() {
		return this.pixiObj.scale.x;
	}
	///SKEW
	set skew(value) {
		this.pixiObj.skew.x = value;
		this.pixiObj.skew.y = value;
	}

	get skew() {
		return this.pixiObj.skew.x;
	}

	//ANGLE
	set angle(value) {
		this.pixiObj.angle = value;
	}

	get angle() {
		return this.pixiObj.angle;
	}

	//SORTABLE CHILDREN
	set sortableChildren(value) {
		this.pixiObj.sortableChildren = value;
	}
	get sortableChildren() {
		return this.pixiObj.sortableChildren;
	}

	//ZINDEX
	set zIndex(value) {
		this.pixiObj.zIndex = value;
	}
	get zIndex() {
		return this.pixiObj.zIndex;
	}

	//ORIGIN
	set origin(value) {
		this.setOrigin(value);
	}
	get origin() {
		return this.pixiObj.anchor || this.pixiObj.pivot;
	}

	set originX(value) {
		this.pixiObj.anchor ? (this.pixiObj.anchor.x = value) : (this.pixiObj.pivot.x = value);
	}
	get originX() {
		return this.pixiObj.anchor ? this.pixiObj.anchor.x : this.pixiObj.pivot.x;
	}

	set originY(value) {
		this.pixiObj.anchor ? (this.pixiObj.anchor.y = value) : (this.pixiObj.pivot.y = value);
	}
	get originY() {
		return this.pixiObj.anchor ? this.pixiObj.anchor.y : this.pixiObj.pivot.y;
	}

	//HELPER FUNCTIONS
	setAlpha(value) {
		this.pixiObj.alpha = value;
		return this;
	}
	setTint(value) {
		this.pixiObj.tint = value;
		return this;
	}
	setBlendMode(value) {
		this.pixiObj.blendMode = value;
		return this;
	}

	setPosition(x, y) {
		this.pixiObj.x = x;
		this.pixiObj.y = y;
	}

	setScale(x, y) {
		if (y === undefined) {
			y = x;
		}
		this.pixiObj.scale.set(x, y);
		return this;
	}

	setSkew(x, y) {
		if (y === undefined) {
			y = x;
		}
		this.pixiObj.skew.set(x, y);
		return this;
	}

	setRotation(value) {
		this.pixiObj.rotation = value;
		return this;
	}

	setAngle(value) {
		this.pixiObj.angle = value;
		return this;
	}

	setOrigin(x, y) {
		if (y === undefined) {
			y = x;
		}
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		temp.set(x, y);

		return this;
	}

	setAnchor(x, y) {
		this.setOrigin(x, y);
	}

	destroy() {
		this.pixiObj.destroy();
	}

	//TOP BOTTOM LEFT RIGHT GETTERS AND SETTERS
	get top() {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		return this.pixiObj.y - this.pixiObj.height * temp.y;
	}

	get bottom() {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		return this.pixiObj.y + this.pixiObj.height * (1 - temp.y);
	}

	get left() {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		return this.pixiObj.x - this.pixiObj.width * temp.x;
	}

	get right() {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		return this.pixiObj.x + this.pixiObj.width * (1 - temp.x);
	}

	//TOP BOTTOM LEFT RIGHT SETTERS
	set top(value) {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		this.pixiObj.y = value + this.pixiObj.height * temp.y;
	}

	set bottom(value) {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		this.pixiObj.y = value - this.pixiObj.height * (1 - temp.y);
	}

	set left(value) {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		this.pixiObj.x = value + this.pixiObj.width * temp.x;
	}

	set right(value) {
		let temp = this.pixiObj.anchor ? this.pixiObj.anchor : this.pixiObj.pivot;
		this.pixiObj.x = value - this.pixiObj.width * (1 - temp.x);
	}

	//DIMENSIONS - WIDTH
	set width(width) {
		this.pixiObj.width = width;
	}
	get width() {
		return this.baseWidth;
	}

	set displayWidth(width) {
		this.pixiObj.width = width;
	}

	get displayWidth() {
		return this.pixiObj.width;
	}

	//DIMENSIONS - HEIGHT
	set height(height) {
		this.pixiObj.height = height;
	}
	get height() {
		return this.baseHeight;
	}

	set displayHeight(height) {
		this.pixiObj.height = height;
	}

	get displayHeight() {
		return this.pixiObj.height;
	}

	///CLONE
	clone() {
		let sceneController = pfGlobals.pixiApp.sceneController;

		let clone = (obj) => {
			if (obj.isEditorObject) {
				let newData = JSON.parse(JSON.stringify(obj.data));
				delete newData.parentUUID;
				newData.uuid = uuidv4();
				let newObj = sceneController._addObject(newData);
				return newObj;
			} else {
				let newObj;
				if (obj.clone) {
					newObj = obj.clone();
				} else {
					if (obj.isSprite) {
						newObj = new Sprite.from(obj.texture);
					} else {
						console.warn("Object cannot be cloned, ask Omer to add support for it.");
					}
				}

				if (newObj) {
					newObj.x = obj.x;
					newObj.y = obj.y;
					newObj.scale.x = obj.scale.x;
					newObj.scale.y = obj.scale.y;
					newObj.rotation = obj.rotation;
					newObj.alpha = obj.alpha;
					newObj.tint = obj.tint;
					newObj.blendMode = obj.blendMode;
					newObj.visible = obj.visible;

					return newObj;
				}
			}
		};

		let traverse = (obj, parent) => {
			if (obj.children) {
				for (let child of obj.children) {
					let newObj = clone(child);
					if (newObj) {
						parent.addChild(newObj);
						traverse(child, newObj);
					}
				}
			}
		};

		let returnObj = clone(this);
		traverse(this, returnObj);

		return returnObj;
	}

	//RESIZE
	set onResize(callback) {
		this.pixiObj.onResizeCallback = callback;
	}
	get onResize() {
		return this.pixiObj.onResizeCallback;
	}
	set onResizeCallback(callback) {
		this.onResize = callback;
	}
	get onResizeCallback() {
		return this.onResize;
	}

	///TO SUPPORT PIXI CODES
	scale = {
		set: (x, y) => {
			this.setScale(x, y);
		},
		get: () => {
			return this.pixiObj.scale.x;
		},
	};

	anchor = {
		set: (x, y) => {
			this.setOrigin(x, y);
		},
		get: () => {
			return this.pixiObj.anchor;
		},
	};

	pivot = {
		set: (x, y) => {
			this.setOrigin(x, y);
		},
		get: () => {
			return this.pixiObj.pivot;
		},
	};

	position = {
		set: (x, y) => {
			this.setPosition(x, y);
		},
		get: () => {
			return { x: this.pixiObj.x, y: this.pixiObj.y };
		},
	};

	skew = {
		set: (x, y) => {
			this.setSkew(x, y);
		},
		get: () => {
			return { x: this.pixiObj.skew.x, y: this.pixiObj.skew.y };
		},
	};
}

export default GameObject;
