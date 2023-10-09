let submit = document.getElementById('submit');

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value;
    console.log(password)
    let users = JSON.parse(localStorage.getItem('users'))
     users.forEach((user) => {
        console.log(user)
        if(user.email === email){
        thisUser = {'email':user.email, 'password': user.password, 'Name':user.Name,'id':user.id}
        authenticate(thisUser);
    }
      
       
    })
    
  

        function authenticate(user){
            if(user.email != email){alert('Incorrect email!')}
            else if (user.password!=password) {
                alert('incorrect password !')
            }
            
            else {
               let s = user.Name+" "+user.email+" "+ user.id+" "+user.password
                localStorage.setItem('user',s );
                alert('login seccess')
                window.open('../main/Shop.html','_self')
                
            }
        }
    
    

  
    


})