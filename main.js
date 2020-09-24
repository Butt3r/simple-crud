const modal = document.querySelector(".modal"),
      table = document.getElementById("archiveList").getElementsByTagName('tbody')[0],
      addModal = document.querySelector(".add-btn");
      


const arr = ["title", "kind", "difficulty", "assigned"];
let cnt = 0;
let selectedRow = null;


let title = document.getElementById("title"),
    kind = document.getElementById("kind"),
    level = document.getElementById("difficulty"),
    assigned = document.getElementById("assigned");


function Toggle()
{
    modal.classList.toggle('visible');
}

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


function submitForm()
{
    if(!emptyCheck())
    {
        if(selectedRow == null)
        {
            writeData();
            //cnt++;
        }
        else
            //updateData(formData);
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

    var newPost = db.ref('recipe/'+counter);
    newPost.set(postData);

}


function getData()
{
   var rRef = db.ref("recipe/");
   rRef.on("child_added", function(snapshot)
   {
       var dataVal = snapshot.val();    
       insertData(dataVal)
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
    selectedRow = data.parentElement.parentElement;
    title.value = selectedRow.cells[1].innerHTML;
    kind.value = selectedRow.cells[2].innerHTML;
    level.value = selectedRow.cells[3].innerHTML;
    assigned.value  = selectedRow.cells[4].innerHTML;
    Toggle();
    

}


function deleteData(data)
{
    if (confirm('Are you sure to delete this record ?')) {
        var activeRow = data.parentElement.parentElement.rowIndex;
        document.getElementById("archiveList").deleteRow(activeRow);
        resetData();
    }
  
}

function resetData()
{
    var form = document.getElementById("form");
    form.reset();
    selectedRow = null;
}

function updateData(data)
{
   
    selectedRow.cells[1].innerHTML = data.title;
    selectedRow.cells[2].innerHTML = data.category;
    selectedRow.cells[3].innerHTML = data.level;
    selectedRow.cells[4].innerHTML = data.user;
}

function readfirebase()
{
    var gRef = db.ref("/");
    gRef.on("value", function(snapshot) {
    var fullData = snapshot.val();
    var childData = snapshot.child("recipe").val();
    var currData = snapshot.child(`recipe/${counter}`).val();
    console.log(fullData);
    console.log(childData);
    console.log(currData);
    
  });
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