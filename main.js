const modal = document.querySelector(".modal"),
      table = document.getElementById("archiveList").getElementsByTagName('tbody')[0],
      addModal = document.querySelector(".add-btn"),
      submitBtn = document.querySelector(".submit-btn"),
      updateBtn = document.querySelector(".update-btn");


const arr = ["title", "artist", "kind", "rate"];
let selectedRow = null;
let getKey = "";
var title = document.getElementById("title"),
    artist = document.getElementById("artist"),
    kind = document.getElementById("kind"),
    rate = document.getElementById("rate");

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
  var ts = new Date().getTime();
  var counter = ts;


function Toggle()
{
    modal.classList.toggle('visible');
    submitBtn.classList.remove('hide');
    updateBtn.classList.remove('visible');
    resetData();
    
}


function submitForm()
{
    var formData = readData();
    if(!emptyCheck())
    {
        if(selectedRow == null)
        {
            writeData();
        }
        else
        {
            updateData(formData);
        }
        history.go(0);
    resetData();
    }
   
}

function writeData()
{
    counter++;

    var postData = {
        id: counter,
        title: title.value,
        artist: artist.value,
        category: kind.value,
        rate: rate.value,
    };

    var newRef = db.ref('recipe/');
    newRef.push(postData).key;
    
}


function getData()
{

   // TODO: child_added, child_changed ... ETC
   var rRef = db.ref("recipe/");
   rRef.once("value", function(snapshot)
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

    var newRow = table.insertRow(table.length);
    var cell = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);

    
    cell.innerHTML = data.id;
    cell1.innerHTML = data.title;
    cell2.innerHTML = data.artist;
    cell3.innerHTML = data.category;
    cell4.innerHTML = data.rate;
   
    

    var cell5 = newRow.insertCell(5);
    cell5.innerHTML =  
    `<i class = "fa fa-pencil" onClick="editData(this, event)" id="${key}" style="color:#17bd7f"></i> &emsp;&nbsp;
     <i class = "fa fa-trash" onClick="deleteData(this, event)" id="${key}" style="color:#ed2d40"></i>`
    
}


function editData(data, event)
{
    selectedRow = data.parentElement.parentElement;
    title.value = selectedRow.cells[1].innerHTML;
    artist.value = selectedRow.cells[2].innerHTML;
    kind.value = selectedRow.cells[3].innerHTML;
    rate.value  = selectedRow.cells[4].innerHTML;
    modal.classList.toggle('visible');
    submitBtn.classList.add('hide');
    updateBtn.classList.add('visible');

    getKey = event.target.id
}


function updateData(formData)
{
    console.log(getKey);
    let updates = {title: formData.title, artist: formData.artist, category: formData.kind, rate: formData.rate};
    const newRef = db.ref(`recipe/${getKey}`);
    newRef.update(updates);
}


function deleteData(data)
{
    //var targetkey = event.target.id;

    if (confirm('현재 레코드를 삭제하시겠습니까?')) {
        var activeRow = data.parentElement.parentElement.rowIndex;
        document.getElementById("archiveList").deleteRow(activeRow);
        let dRef = db.ref(`recipe/${getkey}`);
        dRef.remove()
        resetData();
    }
  
}

function resetData()
{
    var form = document.getElementById("form");
    form.reset();
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