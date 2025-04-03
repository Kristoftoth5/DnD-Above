import { useEffect } from "react";

function FinalDataTransfer({ Stats, RaceId, SubraceId, ClassId, SubclassId, FightingStyle, Invocation, Metamagic, BgSkillProfList, BgName, BgDesc, BgTool, EqList, RemainingGold, SpellIdList })
{

    useEffect(() => {
        console.log(RaceId + " " + SubraceId)
        console.log(BgSkillProfList + " " + BgName + " " + BgDesc + " " +  BgTool)
    }, [])




    return (
        <></>
    );
}

export default FinalDataTransfer;