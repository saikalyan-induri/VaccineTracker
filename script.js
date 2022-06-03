console.log("Hellow World");

let search=document.getElementById('submit');

let inputText=document.getElementById('search');

let curr=0;

// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=500062&date=28-07-2021



search.addEventListener('click',getData);

function getData(event) {
    event.preventDefault();
    let text=inputText.value;
    inputText.value="";
    // console.log(text);
    if(text.length>0){
        ApiRequest(text);
    }
    else{
        // document.getElementById('root').innerHTML="";
        // document.getElementById('sideMain').innerHTML="";
        // document.getElementById('sideMain').insertAdjacentHTML('beforeend',`
        //         <div class="noCenters">
        //             <div>Invalid PIN code / No centers available 😞</div>
        //         </div>
        //     `)
    }
}



async function ApiRequest(text){
    console.log(text);
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    let year = d.getFullYear();
    if(month.length==1){
        month="0"+month;
    }
    let todaysDate = date+"-"+month+"-"+year;
    document.getElementById('root').innerHTML="";
    document.getElementById('sideMain').innerHTML="";
    console.log(todaysDate);
    await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${text}&date=${todaysDate}`)
        .then((request) =>{
            return request.json();
        })
        .then((data) =>{
            console.log(data);
            if(data.sessions.length===0){
                // document.getElementById('root').innerHTML="No centers available 😞";
            //     document.getElementById('sideMain').insertAdjacentHTML('beforeend',`
            //     <div class="noCenters">
            //         <div>No centers available 😞</div>
            //     </div>
            // `)
            document.getElementById('sideMain').insertAdjacentHTML('beforeend',`
                <div class="noCenters">
                    <div>No centers available 😞</div>
                </div>
             `)
            }
            else{
                let arr=data.sessions;
                console.log(arr);
                arr.forEach(element => {
                    let vaccine=element.vaccine;
                    let address=element.address;
                    let fee=element.fee;
                    let name=element.name;
                    console.log(vaccine);
                    document.getElementById('root').insertAdjacentHTML('beforeend',`
                        <div class="data" >
                            <div class="name">Hospital: ${name}</div>
                            <div class="address">Address: ${address}</div>
                            <div class="vaccine"> 
                                <div>${vaccine} :₹ ${fee}</div> 
                            </div>
                        <div>
                    `)
                });
            }
        })
        .catch((error) =>{
            document.getElementById('root').innerHTML="";
            document.getElementById('sideMain').innerHTML="";
            document.getElementById('sideMain').insertAdjacentHTML('beforeend',`
                    <div class="noCenters">
                        <div>Invalid PIN code</div>
                    </div>
                `)
        })
}