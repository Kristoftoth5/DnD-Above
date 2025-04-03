import { useEffect } from "react";

function FinalDataTransfer({ Update, Stats, RaceId, SubraceId, ClassId, SubclassId, FightingStyle, Invocation, Metamagic, BgSkillProfList, BgName, BgDesc, BgTool, EqList, RemainingGold, SpellIdList })
{

    useEffect(() => {
        console.log(RaceId + " " + SubraceId)
        console.log(BgSkillProfList + " " + BgName + " " + BgDesc + " " +  BgTool)
        
    }, [RaceId])




    return (
        <></>
    );
}

export default FinalDataTransfer;