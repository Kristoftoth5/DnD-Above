import { useEffect, useState } from "react";

function FinalDataTransfer({ Update, Stats, RaceId, SubraceId, ClassId, SubclassId, FightingStyle, Invocation, Metamagic, BgSkillProfList, BgName, BgDesc, BgTool, EqList, RemainingGold, SpellIdList })
{


    useEffect(() => {
        function CallPage()
        {
            {RaceId != undefined ? console.log(RaceId) : null}
            {SubraceId != undefined ? console.log(SubraceId) : null}
            {BgName != undefined ? console.log(BgName) : null}
            {BgDesc != undefined ? console.log(BgDesc) : null}
            {BgSkillProfList != undefined ? console.log(BgSkillProfList) : null}
            {BgTool != undefined ? console.log(BgTool) : null}
            console.log(Update)
        }
        CallPage()

    })
    




    return (
        <>   
        </>
    );
}

export default FinalDataTransfer;