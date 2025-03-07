function diceToInteger(die)
{
    die = die.substring(1, die.length);

    die = parseInt(die);

    return die;
}

export default diceToInteger;