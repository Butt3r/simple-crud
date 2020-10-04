const modal = document.querySelector(".modal"),
      table = document.getElementById("table-id").getElementsByTagName('tbody')[0],
      addModal = document.querySelector(".add-btn"),
      submitBtn = document.querySelector(".submit-btn"),
      updateBtn = document.querySelector(".update-btn"),
      selectForm = document.querySelector(".form-control");



const arr = ["kind", "title", "format", "rate", "link"];
// TODO: increment id
//const increment = firebase.database.ServerValue.increment(1);


let selectedRow = null;
let getKey = "";
var title = document.getElementById("title"),
    kind = document.getElementById("kind"),
    format = document.getElementById("format"),
    rate = document.getElementById("rate"),
    url = document.getElementById("link");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
    apiKey: "AIzaSyDr_xnNQ-cP1VD_ykYTKyofna2qAhoF8OY",
    authDomain: "open-archive-9fa31.firebaseapp.com",
    databaseURL: "https://open-archive-9fa31.firebaseio.com",
    projectId: "open-archive-9fa31",
    storageBucket: "open-archive-9fa31.appspot.com",
    messagingSenderId: "464146043818",
    appId: "1:464146043818:web:08f228d322a1089414d1d3",
    measurementId: "G-39XT1VSXN5"
  };

  firebase.initializeApp(config);
  firebase.analytics();

  var db = firebase.database();
  var ref = firebase.database().ref('recipe/')
  var ts = new Date().getTime();
  var counter = ts;



function Toggle()
{
    modal.classList.toggle('visible');
    submitBtn.classList.remove('hide');
    updateBtn.classList.remove('visible');
    selectForm.classList.remove('colored');
    resetData();
    
}

function submitForm()
{
    var formData = readData();
    if(!emptyCheck())
    {
        if(selectedRow == null)
            writeData(formData);
        else
            updateData(formData);
        history.go(0);
    resetData();
    }
   
}

function writeData(data)
{
    counter++;

    var postData = {
        category: data.kind,
        title: data.title,
        format: data.format,
        rate: data.rate,
        url: data.link
    };
    ref.push(postData).key;
    
}


function getData()
{

   // TODO: child_added, child_changed ... ETC
   ref.once("value", function(snapshot)
   {
    snapshot.forEach(function(childSnapshot)
    {
        var dataVal = childSnapshot.val();  
        var dataKey = childSnapshot.key; 
        console.log(Object.values(snapshot.val()));
        console.log(Object.keys(snapshot.val()));
        insertData(dataKey, dataVal);
    });
   });
     
}

function readData()
{
    var formData = {};

    for(var i in arr)
    {
        formData[arr[i]] = document.getElementById(arr[i]).value;
    }

    return formData;

}

function insertData(key, data)
{

    //var cell = newRow.insertCell(0);
    // cell.innerHTML = data.id;

    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = data.category;
    cell2.innerHTML = data.title;
    cell3.innerHTML = data.format;
    cell4.innerHTML = data.rate;
   
    

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML =  
    `<i class = "fa fa-pencil" onClick="event.stopPropagation(); editData(this, event)"  id="${key}" style="color:#17bd7f"></i> &emsp;&nbsp;
     <i class = "fa fa-trash" onClick="event.stopPropagation(); deleteData(this, event)" id="${key}" style="color:#ed2d40"></i>`


    
    newRow.onclick = function(e)
    {
        //alert(key);
        console.log(e);
        ref.child(key).once("value", function(childSnapshot){
            window.open(childSnapshot.val().url);
        });
    }

}
 

function editData(data)
{

    selectedRow = data.parentElement.parentElement;
    console.log(selectedRow);
    
    getKey = event.target.id;

    ref.child(getKey).once("value", function(snapshot)
   {
        kind.value = snapshot.val().category;
        title.value = snapshot.val().title;
        format.value = snapshot.val().format;
        rate.value  = snapshot.val().rate;
        url.value = snapshot.val().url;
       
    });
    modal.classList.toggle('visible');
    submitBtn.classList.add('hide');
    updateBtn.classList.add('visible');
    selectForm.classList.add('colored');
    

   
}


function updateData(formData)
{
    console.log(getKey);
    let updates = {category: formData.kind, title: formData.title, format: formData.format, rate: formData.rate, url: formData.link};
    const newRef = db.ref(`recipe/${getKey}`);
    newRef.update(updates);
}


function deleteData(data)
{
    var targetkey = event.target.id;

    if (confirm('Are you sure you want to delete?')) {
        var activeRow = data.parentElement.parentElement.rowIndex;
        document.getElementById("table-id").deleteRow(activeRow);
        let dRef = db.ref(`recipe/${targetkey}`);
        dRef.remove()
        resetData();
    }
  
}

function resetData()
{
    var Dataform = document.getElementById("form");
    Dataform.reset();
    selectedRow = null;
}


function emptyCheck()
{
    var isEmpty = false;

    for(var i in arr)
    {
        if(document.getElementById(arr[i]).value == "")
        {
        isEmpty = true;
        alert(`${arr[i]} can not be empty`); break;
        }
    }
    return isEmpty;
}

function init()
{
    getData();
  
}

init();