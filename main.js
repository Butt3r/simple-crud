const modal = document.querySelector(".form-modal"),
      table = document.getElementById("archiveList").getElementsByTagName('tbody')[0],
      addModal = document.querySelector(".add-btn"),
      title = document.getElementById("title"),
      artist = document.getElementById("artist"),
      year = document.getElementById("year"),
      media = document.getElementById("media");


const arr = ["title", "artist", "year", "media"];
let cnt = 0;
let selectedRow = null;



function Toggle()
{
    modal.classList.toggle('visible');
}


function submitForm(e)
{
    if(!emptyCheck())
    {
        var formData = readData();
        if(selectedRow == null)
        {
            cnt++;
            insertData(formData); 
        }
        else
            updateData(formData);
        clearData();
    }

    var img = document.getElementById("output");
    img.src = URL.createObjectURL(e.target.files[0]);
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


function insertData(data)
{
    var newRow = table.insertRow(table.length);
    var cell = newRow.insertCell(0);
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);

    cell.innerHTML = cnt;
    cell1.innerHTML = data.title;
    cell2.innerHTML = data.artist;
    cell3.innerHTML = data.year;
    cell4.innerHTML = data.media;
    

    var cell5 = newRow.insertCell(5);
    cell5.innerHTML =  
    `<i class = "fa fa-pencil" onClick="editData(this)" id="edit" style="color:#17bd7f"></i> &emsp;&nbsp;
     <i class = "fa fa-trash" onClick="deleteData(this)" id="del" style="color:#ed2d40"></i>`;
   
    
}

function editData(data)
{
    selectedRow = data.parentElement.parentElement;
    title.value = selectedRow.cells[1].innerHTML;
    artist.value = selectedRow.cells[2].innerHTML;
    year.value = selectedRow.cells[3].innerHTML;
    media.value = selectedRow.cells[4].innerHTML;
    Toggle();
    

}


function deleteData(data)
{
    if (confirm('Are you sure to delete this record ?')) {
        var activeRow = data.parentElement.parentElement.rowIndex;
        document.getElementById("archiveList").deleteRow(activeRow);
        clearData();
    }
  
}


function updateData(formData)
{
    selectedRow.cells[1].innerHTML = formData.title;
    selectedRow.cells[2].innerHTML = formData.artist;
    selectedRow.cells[3].innerHTML = formData.year;
    selectedRow.cells[4].innerHTML = formData.media;
}


function clearData()
{
    
    title.value = "";
    artist.value = "";
    year.value = "";
    media.value = "";
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


function loadFile(e)
{
    var img = document.getElementById("output");
    img.src = URL.createObjectURL(e.target.files[0]);
}