

const randomNumber = (count) => {
    let str = ""; // Initialize as an empty string
    for (let i = 0; i < count; i++) {
        let num = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
        str += num; // Concatenate the digit to the string
    }
    return str; // Return the final string
};

    const randomCharacter = (count)=>
    {
        const alphabets = "abcdefghijklmnopqrstuvwxyz";
        let randomString = '';

        for(let i = 0;i<count;i++)
        {
            const random =  Math.floor(Math.random()*alphabets.length);
            randomString += alphabets[random];
        }
        return randomString;

    };

    const spec=(count)=>{
        const special = "!@#$%^";
        let specn='';
        for(let i = 0;i<count;i++)
        {
            
            const num = Math.floor(Math.random()*special.length);
            specn += special[num];

        }
        return specn;
    }


export default{ randomNumber,randomCharacter,spec}