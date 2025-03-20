function profCalc(Level)
{
    let PB = 2;
    PB += (Level - 1) / 4
    PB = Math.floor(PB)

    return PB;
}

export default profCalc;