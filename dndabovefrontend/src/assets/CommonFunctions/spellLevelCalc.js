function spellLevelCalc(spellCaster,halfCaster,characterLevel)
{
    var spellLevel = 1;
    if(spellCaster & !halfCaster & characterLevel <= 17) 
    {
        spellLevel = (Math.round(characterLevel/2));
    } 
    if(!spellCaster & halfCaster & characterLevel <= 17)
    {
        spellLevel = (Math.round(((characterLevel-1)/4)));
    }
    else
    {
        spellLevel = 1;
    }

    return spellLevel;
}

export default spellLevelCalc