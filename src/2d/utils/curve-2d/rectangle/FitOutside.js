

var GetAspectRatio = require('./GetAspectRatio');


var FitOutside = function (target, source)
{
    var ratio = GetAspectRatio(target);

    if (ratio > GetAspectRatio(source))
    {
        //  Wider than Tall
        target.setSize(source.height * ratio, source.height);
    }
    else
    {
        //  Taller than Wide
        target.setSize(source.width, source.width / ratio);
    }

    return target.setPosition(
        source.centerX - target.width / 2,
        source.centerY - target.height / 2
    );
};

module.exports = FitOutside;
