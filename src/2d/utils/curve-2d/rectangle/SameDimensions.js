


var SameDimensions = function (rect, toCompare)
{
    return (rect.width === toCompare.width && rect.height === toCompare.height);
};

module.exports = SameDimensions;
