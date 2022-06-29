var answer = [];

/* The following is the layout of how the numbers are filled. This is based on the "slowest" rules being put in first priority.
XX 00 14 05 XX
15 01 16 06 10
17 02    07 11
18 03 19 08 12
XX 04 13 09 XX
*/

var numberOptions = new Map();


// Certain tiles, based on different rules, can only be certain numbers.
// vii across
numberOptions.set(7, [1,3,7,9]);
numberOptions.set(11, [1,3,7,9]);

// vi across
numberOptions.set(17, [1,3,7,9]);
numberOptions.set(2, [1,3,7,9]);

// iv down
numberOptions.set(18, [1,3,7,9]);

// v down
numberOptions.set(12, [1,3,7,9]);

// ix down
numberOptions.set(13, [1,3,7,9]);

// x across because of v down
numberOptions.set(4, [1,3,7,9]);

function solve(spots)
{
    var position = spots.length;
    var validNumbers = numberOptions.get(position) || [1,2,3,4,5,6,7,8,9];
    for(var i of validNumbers)
    {
        if (answer.length > 0)
            return;
        spots.push(i);
        if (isComplete(spots) && isValid(spots))
        {
            answer = [...spots];
        }
        else if (isValid(spots))
            solve(spots);
        spots.pop(i);
    }
}

// Complete means all 20 spots are filled
function isComplete(spots)
{
    return spots.length == 20;
}

// Valid means it has not broken a rule. If the rule isn't able to be judged, it is still considered valid.
function isValid(spots)
{
    if (!ruleOneAcross(spots)) return false;
    if (!ruleThreeDown(spots)) return false;
    if (!ruleSixAcross(spots)) return false;
    if (!ruleSevenAcross(spots)) return false;
    if (!ruleEightAcross(spots)) return false;
    if (!ruleTenAcross(spots)) return false;
    if (!ruleFourDown(spots)) return false;
    if (!ruleFiveDown(spots)) return false;
    if (!ruleNineDown(spots)) return false;
    if (!ruleFourAcross(spots)) return false;

    return true;
}

function ruleOneAcross(spots)
{
    if (spots.length >= 6)
    {
        if (spots[0] + spots[5] < 7 || spots[0] + spots[5] > 16)
            return false;
    }
    if (spots.length >= 15)
    {
        if (spots[0] + spots[14] + spots[5] != 16)
            return false;
    }
    return true;
}

function ruleFourAcross(spots)
{
    if (spots.length >= 17)
    {
        var xAcross = createNumber(
            [spots[4], spots[13], spots[9]]
        );
        var vDown = createNumber(
            [spots[10], spots[11], spots[12]]
        );

        var ivAcross = createNumber(
            [spots[15], spots[1], spots[16], spots[6], spots[10]]
        );

        if (xAcross * vDown != ivAcross)
            return false;
    }
    return true;
}

function ruleSixAcross(spots)
{
    if (spots.length >= 18)
    {
        var numberToCheck = createNumber([spots[17], spots[2]]);
        var secondNumberToCheck = createNumber([spots[2], spots[17]]);
        if (!isPrime(numberToCheck) || !isPrime(secondNumberToCheck))
            return false;
    }
    return true;
}

function ruleSevenAcross(spots)
{
    if (spots.length >= 12)
    {
        var numberToCheck = createNumber([spots[7], spots[11]]);
        var secondNumberToCheck = createNumber([spots[11], spots[7]]);
        if (!isPrime(numberToCheck) || !isPrime(secondNumberToCheck))
            return false;
    }
    return true;
}

function ruleEightAcross(spots)
{
    if (spots.length == 20)
    {
        var iAcross = createNumber(
            [spots[0], spots[14], spots[5]]
        );

        var viiiAcross = createNumber(
            [spots[18], spots[3], spots[19], spots[8], spots[12]]
        );
        if (viiiAcross % iAcross != 0)
            return false;
    }
    return true;
}

function ruleTenAcross(spots)
{
    if (spots.length >= 14)
    {
        if (spots[4] != spots[12])
            return false;
        if (spots[13] != spots[11])
            return false;
        if (spots[9] != spots[10])
            return false;
    }
    return true;
}

function ruleThreeDown(spots)
{
    if (spots.length >= 10)
    {
        var iiiDown = createNumber(
            [spots[5], spots[6], spots[7], spots[8], spots[9]]
        );

        var iDown = createNumber(
            [spots[0], spots[1], spots[2], spots[3], spots[4]]
        );

        if (iiiDown === iDown)
            return false;

        if (iiiDown % iDown != 0)
            return false;

    }
    return true;
}

function ruleFourDown(spots)
{
    if (spots.length >= 19)
    {
        var ivDown = createNumber(
            [spots[15], spots[17], spots[18]]
        );

        if (!isPrime(ivDown))
            return false;
    }
    return true;
}

function ruleFiveDown(spots)
{
    if (spots.length >= 13)
    {
        var ivDown = createNumber(
            [spots[10], spots[11], spots[12]]
        );

        if (!isPrime(ivDown))
            return false;
    }
    return true;
}

function ruleNineDown(spots)
{
    if (spots.length == 20)
    {
        var ivDown = createNumber(
            [spots[19], spots[13]]
        );

        if (!isPrime(ivDown))
            return false;
    }
    return true;
}

function createNumber(list)
{
    var sum = 0;
    list.reverse();
    for(var i = 0; i < list.length; i++)
        sum += list[i] * Math.pow(10, i);
    return sum;
}

function isPrime(num)
{
    for(var i = 2; i < num; i++)
    {
        if (num % i == 0)
            return false;
    }
    return true;
}

function printAnswer(spots)
{
    console.log(" ", spots[0], spots[14], spots[5], " ");
    console.log(spots[15], spots[1], spots[16], spots[6], spots[10]);
    console.log(spots[17], spots[2], " ", spots[7], spots[11]);
    console.log(spots[18], spots[3], spots[19], spots[8], spots[12]);
    console.log(" ", spots[4], spots[13], spots[9], " ");
}