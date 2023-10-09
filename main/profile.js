let user = localStorage.getItem('user')

let userInfo = user.split(" ")

// rendering profile
console.log(user)
// ==============================================================
let profileBox = document.createElement('div');
profileBox.id = 'container'
profileBox.innerHTML = `
<h2>Profile</h2>
<img src="../utils/profile.png">
<div>
<div class="div"><b>Name: </b> ${userInfo[0]}</div>
<div class="div"><b>Email: </b> ${userInfo[1]}</div>
<div class="div"><b>Your ID: </b> ${userInfo[2]}</div>
<button onclick="changeinfobtn()">Change Info</button>
<button onclick="changepassbtn()">Change Password</button>


</div>`

let body = document.querySelector('body')
body.appendChild(profileBox);




// =====================================================================
function changeinfobtn() {
    document.getElementsByClassName('Container')[0].style.display = 'flex'
}

function changeinfo() {
    let newName = document.getElementById('newname').value.trim();
    let newEmail = document.getElementById('newemail').value.trim();
    if (newEmail == '' || newName == '') {
        alert('all fields are mandetory!')
        return;
    }

    let user = localStorage.getItem('user')

    let userInfo = user.split(" ")
    userInfo[0] = newName;
    userInfo[1] = newEmail;

    let newinfo = userInfo[0] + " " + userInfo[1] + " " + userInfo[2] + " " + userInfo[3];
    localStorage.setItem('user', newinfo)

    let users = JSON.parse(localStorage.getItem('users'));
    let i = 0
    users.forEach(user => {
        if (user.email == userInfo[1]) {
            let newName = document.getElementById('newname').value.trim();
            let newEmail = document.getElementById('newemail').value.trim();
            user.email = newEmail;
            user.Name = newName;
            let obj = { 'Name': newName, 'email': newEmail, 'password': user.password, 'id': user.id }
            users.push(obj)
            users.shift(i)
            localStorage.setItem('users', JSON.stringify(users))
        }
        i++;
    });


    document.getElementById('container').remove();
    let profileBox = document.createElement('div');
    profileBox.id = 'container'
    profileBox.innerHTML = `
<h2>Profile</h2>
<img src="../utils/profile.png">
<div>
<div class="div"><b>Name: </b> ${userInfo[0]}</div>
<div class="div"><b>Email: </b> ${userInfo[1]}</div>
<div class="div"><b>Your ID: </b> ${userInfo[2]}</div>
<button onclick="changeinfobtn()">Change Info</button>
<button onclick="changepassbtn()">Change Password</button>


</div>`

    let body = document.querySelector('body')
    body.appendChild(profileBox);
    document.getElementsByClassName('Container')[0].style.display = 'none'

}


//=======================================================================

function changepassbtn() {
    document.getElementsByClassName('Container')[1].style.display = 'flex'
}
function changepass() {
    let newPass = document.getElementById('newpass').value
    let currentPass = document.getElementById('currpass').value
    if (newPass == '' || currentPass == '') {
        alert('All fields are mandetory!')
        return
    }
    let user = localStorage.getItem('user')
    let userInfo = user.split(" ")
    if (currentPass != userInfo[3]) {
        alert('Enter correct current password!')
    }
    userInfo[3] = newPass;


    let newinfo = userInfo[0] + " " + userInfo[1] + " " + userInfo[2] + " " + userInfo[3];
    localStorage.setItem('user', newinfo)

    let users = JSON.parse(localStorage.getItem('users'));
    let i = 0
    users.forEach(user => {
        if (user.email == userInfo[1]) {
            let newPass = document.getElementById('newpass')
            let obj = { 'Name': user.Name, 'email': user.email, 'password': newPass, 'id': user.id }
            users.push(obj)
            users.shift(i)
            localStorage.setItem('users', JSON.stringify(users))
        }
        i++;

    })
    document.getElementsByClassName('Container')[1].style.display = 'none'
}





let menu = document.getElementById('menu')

menu.addEventListener('click',(e)=>{
e.preventDefault();
document.getElementById('navUl').style.display=='flex'?document.getElementById('navUl').style.display='none' : document.getElementById('navUl').style.display='flex';

})
