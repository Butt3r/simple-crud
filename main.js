const modal = document.querySelector(".modal"),
      table = document.getElementById("archiveList").getElementsByTagName('tbody')[0],
      addModal = document.querySelector(".add-btn"),
      submitBtn = document.querySelector(".submit-btn"),
      updateBtn = document.querySelector(".update-btn");


const arr = ["title", "kind", "difficulty", "assigned"];
let cnt = 0;
let selectedRow = null;


let title = document.getElementById("title"),
    kind = document.getElementById("kind"),
    level = document.getElementById("difficulty"),
    assigned = document.getElementById("assigned");
    uid = document.querySelector(".userid");

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
// Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  var db = firebase.database();
  var d = new Date();
  var t = d.getTime();
  var counter = t;


function Toggle()
{
    modal.classList.toggle('visible');
    submitBtn.classList.remove('hide');
    updateBtn.classList.remove('visible');
    resetData();
    
}


function submitForm()
{
    if(!emptyCheck())
    {
        if(selectedRow == null)
        {
            cnt++;
            writeData();
        }
    resetData();
    }
   
}

function writeData()
{
    counter++;

    var postData = {
        id: counter,
        title: title.value,
        category: kind.value,
        level: level.value,
        user: assigned.value
    };

    var newRef = db.ref('recipe/');
    newRef.push(postData).key;
    
}


function getData()
{

   var rRef = db.ref("recipe/");
   rRef.on("value", function(snapshot)
   {
    snapshot.forEach(function(childSnapshot)
    {
        var dataVal = childSnapshot.val();  
        var dataKey = childSnapshot.key; 
        //console.log(dataKey);
        console.log(Object.values(snapshot.val()));
        console.log(Object.keys(snapshot.val()));
        updateData(dataVal, dataKey);
        insertData(dataVal)
    });
   });
  
     
}


function insertData(data)
{
    var newRow = table.insertRow(table.length);
    var cell = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);

    
    cell.innerHTML = data.id;
    cell1.innerHTML = data.title;
    cell2.innerHTML = data.category;
    cell3.innerHTML = data.level;
    cell4.innerHTML = data.user;
   
    

    var cell5 = newRow.insertCell(5);
    cell5.innerHTML =  
    `<i class = "fa fa-pencil" onClick="editData(this)" id="edit" style="color:#17bd7f"></i> &emsp;&nbsp;
     <i class = "fa fa-trash" onClick="deleteData(this)" id="del" style="color:#ed2d40"></i>`



}


function editData(data)
{
    console.log(data.parentElement.parentElement);
    
    selectedRow = data.parentElement.parentElement;
    title.value = selectedRow.cells[1].innerHTML;
    kind.value = selectedRow.cells[2].innerHTML;
    level.value = selectedRow.cells[3].innerHTML;
    assigned.value  = selectedRow.cells[4].innerHTML;
    modal.classList.toggle('visible');
    submitBtn.classList.add('hide');
    updateBtn.classList.add('visible');

}


function updateData()
{

   // console.log(data);
   // console.log(key);
    
    
    let obj = {id: cnt, title: title.value, category: kind.value, level: level.value, user: assigned.value};
    let titleObj = {title: title.value};
    var newRef = db.ref("recipe/").child(selectedRow);
    newRef.update(titleObj);
      
}


function deleteData(data)
{
    if (confirm('Are you sure to delete this record ?')) {
        var activeRow = data.parentElement.parentElement.rowIndex;
        document.getElementById("archiveList").deleteRow(activeRow);
        resetData();
        let dRef = this.db.ref('recipe/' + counter);
        dRef.remove()
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