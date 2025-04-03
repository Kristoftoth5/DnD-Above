import { useEffect } from "react";

function FinalDataTransfer({ Str, Dex, Con, Int, Wis, Cha, RaceId, SubraceId, ClassId, SubclassId, FightingStyle, Invocation, Metamagic, BgToolProf, BgSkillProfList, BgName, BgDesc, BgTool, EqList, RemainingGold, SpellIdList })
{

    useEffect(() => {
        console.log(RaceId + " " + SubraceId)
    }, [RaceId, SubraceId])




    return (
        <></>
    );
}

export default FinalDataTransfer;