import React, { useState, useEffect, useContext } from "react";
import spellLevelCalc from "../CommonFunctions/spellLevelCalc";
import fetchEverything from "../CommonFunctions/fetchEverything";
import profCalc from "../CommonFunctions/profCalc";
import "../Cards.css";
import { FinalSpellsContext } from "../SaveContexts/FinalSpellContext";
import { FinalCharacterLevelContext, CasterContext, HalfcasterContext } from "../SaveContexts/ClassContext";

function SpellCard({ ClassId }) {
    const [spells, setSpells] = useState([]);
    const [eligibleSpells, setEligibleSpells] = useState([]);
    const [displayEligibleSpells, setDisplayEligibleSpells] = useState([]);
    const [highestSpellLevel, setHighestSpellLevel] = useState();
    const [availableSpellLevels, setAvailableSpellLevels] = useState([]);
    const [proficiencyBonus, setProficiencyBonus] = useState(2);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [chosenSpellLevel, setChosenSpellLevel] = useState(undefined);
    const [chosenSpellIds, setChosenSpellIds] = useState([]);
    const [chosenSpellsLimit, setChosenSpellsLimit] = useState(1);
    const [chosenCantripsLimit, setChosenCantripsLimit] = useState(2);
    const [chosenCantripsNumber, setChosenCantripsNumber] = useState(0);
    const [chosenSpells, setChosenSpells] = useState([]);
    const [spellCastingAbilityModifier] = useState(5);
    const [lastFetchedClassId, setLastFetchedClassId] = useState(null);

    const { setFinalSpells } = useContext(FinalSpellsContext);
    const { FinalCharacterLevel } = useContext(FinalCharacterLevelContext);
    const { Caster } = useContext(CasterContext);
    const { Halfcaster } = useContext(HalfcasterContext);

    useEffect(() => {
        async function fetchSpells() {
            if (!ClassId || ClassId === lastFetchedClassId) return;
            try {
                setChosenSpellIds([]);
                setChosenSpells([]);
                setChosenCantripsNumber(0);
                setChosenSpellLevel(undefined);
                setDisplayEligibleSpells([]);

                const response = await fetchEverything("Spells/originclassid/" + ClassId);
                const classData = await fetchEverything("Classes/" + ClassId);

                if (response && Array.isArray(response)) {
                    setSpells(response);
                    setLastFetchedClassId(ClassId);
                } else {
                    console.error("Error: Fetched response is not an array.");
                }
            } catch (error) {
                console.error("Error fetching spells:", error);
            }
        }
        fetchSpells();
    }, [ClassId, lastFetchedClassId]);

    useEffect(() => {
        if (!spells || spells.length === 0) return;
        const level = spellLevelCalc(Caster, Halfcaster, FinalCharacterLevel);

        const tempLevels = Array.from({ length: level + 1 }, (_, i) => i).filter(lvl => Halfcaster === 0 || lvl !== 0);

        setHighestSpellLevel(level);
        setProficiencyBonus(profCalc(FinalCharacterLevel));
        setAvailableSpellLevels(tempLevels);
        setChosenCantripsLimit(Halfcaster !== 0 ? 0 : Math.ceil(FinalCharacterLevel / 4) + 1);
        setChosenSpellsLimit(FinalCharacterLevel + spellCastingAbilityModifier);
    }, [spells, Caster, Halfcaster, FinalCharacterLevel]);

    useEffect(() => {
        if (spells.length === 0 || highestSpellLevel === undefined) return;
        const filteredSpells = spells.filter(spell => spell.level <= highestSpellLevel);
        setEligibleSpells(filteredSpells);
        setDisplayEligibleSpells(filteredSpells);
    }, [spells, highestSpellLevel]);

    useEffect(() => {
        const fetchSpells = async () => {
            const spells = await Promise.all(
                chosenSpellIds.map(id => fetchEverything("Spells/" + id))
            );
            setChosenSpells(spells);
        };
        if (chosenSpellIds.length > 0) {
            fetchSpells();
        } else {
            setChosenSpells([]);
        }
    }, [chosenSpellIds]);

    function spellSelect(id, level) {
        if (chosenSpellIds.includes(id)) return;

        const isCantrip = level === 0;

        if (isCantrip) {
            if (Halfcaster !== 0) return;
            if (chosenCantripsNumber >= chosenCantripsLimit) return;
            setChosenCantripsNumber(prev => prev + 1);
        } else {
            if (chosenSpellIds.length >= chosenSpellsLimit) return;
        }

        setChosenSpellIds(prev => [...prev, id]);
    }

    function spellDeselect(id, level) {
        const isCantrip = level === 0;
        setChosenSpellIds(prev => prev.filter(spellId => spellId !== id));
        if (isCantrip) {
            setChosenCantripsNumber(prev => Math.max(0, prev - 1));
        }
    }

    function spellRemoveDisplay(id) {
        setDisplayEligibleSpells(prev => prev.filter(spell => spell.id !== id));
    }

    async function SpellAddDisplay(id) {
        try {
            const spell = await fetchEverything("Spells/" + id);
            setDisplayEligibleSpells(prev => {
                if (!prev.some(s => s.id === spell.id)) {
                    return [...prev, spell];
                }
                return prev;
            });
        } catch (err) {
            console.error("Error adding spell to display:", err);
        }
    }

    function showDetails(data) {
        window.alert(data);
    }

    function AvailableSpells() {
        return (
            <>
                <p><b>Spellcasting Class Name</b></p>
                <p><b>Spellcasting DC: </b> {8 + spellCastingAbilityModifier + proficiencyBonus} </p>
                <p><b>Spell Attack Bonus: </b> {spellCastingAbilityModifier + proficiencyBonus} </p>
                <div className="dropdown-wrapper">
                    <button className="btn btn-secondary dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        Select Spell Level
                    </button>

                    {dropdownOpen && (
                        <div className="dropdown-menu show">
                            {availableSpellLevels.map((level, id) => (
                                <button className="dropdown-item" onClick={() => { setChosenSpellLevel(level); setDropdownOpen(false); }} key={id}>
                                    {level === 0 ? "Cantrips" : `Level ${level} spells`}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="selected-multiple">
                        {chosenSpellLevel !== undefined && !dropdownOpen && (
                            <>
                                <h3>{chosenSpellLevel === 0 ? "Cantrips" : `Level ${chosenSpellLevel} Spells`}</h3>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>School & Level</th>
                                            <th>Casting Time</th>
                                            <th>Range</th>
                                            <th>Components</th>
                                            <th>Duration</th>
                                            <th>Details</th>
                                            <th>Add Spell</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {displayEligibleSpells.map((spell, id) => (
                                            spell.level === chosenSpellLevel && (
                                                <tr key={id}>
                                                    <td>{spell.name}</td>
                                                    <td>Level {spell.level} {spell.school}</td>
                                                    <td>{spell.castingTime}<sup>{spell.ritual === 1 && <i>R</i>}</sup></td>
                                                    <td>{spell.range}</td>
                                                    <td>{spell.component}<sup>{spell.componentPrice}GP</sup></td>
                                                    <td>{spell.duration}<sup>{spell.concentration === 1 && <b>C</b>}</sup></td>
                                                    <td><button className="btn btn-primary" onClick={() => showDetails(spell.description)}>?</button></td>
                                                    <td>
                                                        <button
                                                            className="btn btn-primary"
                                                            onClick={() => {
                                                                spellSelect(spell.id, spell.level);
                                                                spellRemoveDisplay(spell.id);
                                                            }}
                                                            disabled={
                                                                (spell.level === 0 && (Halfcaster !== 0 || chosenCantripsNumber >= chosenCantripsLimit)) ||
                                                                (spell.level !== 0 && chosenSpellIds.length >= chosenSpellsLimit)
                                                            }
                                                            style={{
                                                                backgroundColor: (
                                                                    (spell.level === 0 && (Halfcaster !== 0 || chosenCantripsNumber >= chosenCantripsLimit)) ||
                                                                    (spell.level !== 0 && chosenSpellIds.length >= chosenSpellsLimit)
                                                                ) ? "#007bff" : "",
                                                                cursor: (
                                                                    (spell.level === 0 && (Halfcaster !== 0 || chosenCantripsNumber >= chosenCantripsLimit)) ||
                                                                    (spell.level !== 0 && chosenSpellIds.length >= chosenSpellsLimit)
                                                                ) ? "not-allowed" : "pointer"
                                                            }}
                                                        >
                                                            Add
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }

    function SelectedSpells() {
        return (
            <>
                {chosenSpells.length !== 0 && (
                    <div className="selected-multiple">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>School & Level</th>
                                    <th>Casting Time</th>
                                    <th>Range</th>
                                    <th>Components</th>
                                    <th>Duration</th>
                                    <th>Details</th>
                                    <th>Remove Spell</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chosenSpells.map((spell, index) => (
                                    <tr key={index}>
                                        <td>{spell.name}</td>
                                        <td>Level {spell.level} {spell.school}</td>
                                        <td>{spell.castingTime}<sup>{spell.ritual === 1 && <i>R</i>}</sup></td>
                                        <td>{spell.range}</td>
                                        <td>{spell.component}<sup>{spell.componentPrice}GP</sup></td>
                                        <td>{spell.duration}<sup>{spell.concentration === 1 && <b>C</b>}</sup></td>
                                        <td><button className="btn btn-primary" onClick={() => showDetails(spell.description)}>?</button></td>
                                        <td><button className="btn btn-primary" onClick={() => { spellDeselect(spell.id, spell.level); SpellAddDisplay(spell.id); }}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            {(Caster !== 0 || Halfcaster !== 0) && (
                <div className="creator-container">
                    <h2 className="creator-title">Spells</h2>
                    <AvailableSpells />
                    <div className="selected-multiple">
                        {chosenSpells.length !== 0 && <SelectedSpells />}
                    </div>
                </div>
            )}
        </>
    );
}

export default SpellCard;