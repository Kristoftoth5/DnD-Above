async function fetchEverything(choice)
{
    if (choice == null)
    {
        choice = "";
    }

    const response = await fetch('https://localhost:7188/api/'+choice);
    var data = await response.json();

    return data;
}

export default fetchEverything;