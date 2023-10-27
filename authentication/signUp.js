
let Name
let email
let password
let confirmPass

let submit = document.getElementById('submit')

let users = [{Name:'yash',email:'y@gmail.com', password:1234, id:34421}]
localStorage.setItem('users',JSON.stringify(users))

submit.addEventListener('click', (e) => {
    e.preventDefault();
    Name = document.getElementById('name').value.trim()
    email = document.getElementById('email').value.trim()
    password = document.getElementById('password').value.trim()
    confirmPass = document.getElementById('conPassword').value.trim()
    
    if (Name === '' || email===''|| password ==='' || confirmPass==='' ) {
        alert('All fields are mandetory !')
    }
    else if(Name.includes(" ")){alert("Don't use space in username!")}
    else if(password != confirmPass){ alert('password and confirm password should be same !')}
    else {
        // console.log(Name)
        let Users =  JSON.parse(localStorage.getItem('users'))
       let alreadyExist =  users.find((user)=> {return user.email===email})

        if (!alreadyExist) {
            let a  = Math.random()*1000;
            let id = Math.round(a)
            let newObj = {'Name':Name,'email':email, 'password' :password,'id':id}
       
            Users.push(newObj)
           localStorage.setItem('users',  JSON.stringify(Users))
           document.querySelector('form').reset();
           window.open('./authentication/login.html', '_self')
     
        }
        else{
            alert('This Email already exist please Log in or use another Email !')
            
        }

       
    }

})



