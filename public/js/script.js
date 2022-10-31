
 //userLoginPage validation

    function adminLoginValidation(){
        let flag =0
        let adminName = document.getElementById('name').value.trim()
        let password = document.getElementById('pass').value.trim()

        let usercheck= /^[A-Za-z.]{3,30}$/
        let passwordcheck = /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/

        if(usercheck.test(password)==''){
            document.getElementById('userNameError').innerHTML=('Name required')
            flag=1

        }else {
            document.getElementById('userNameError').innerHTML=''

        }

        if(passwordcheck.test(password)==''){
            document.getElementById('passwordError').innerHTML='Password Required  8 character and 1 spacial character and integer'
            flag=1
        }else{
            document.getElementById('passwordError').innerHTML=''

        }

        if(flag==1){
            return false
        }

    }



    //userREgisterValidation

    function validation(){
        let flag = 0;
        let firstName = document.getElementById('Fname').value.trim()
        let lastName = document.getElementById('Lname').value.trim()
        let Email = document.getElementById('email').value.trim()
        let password = document.getElementById("pass").value.trim()
        let confirmPassword = document.getElementById('cpass').value.trim()

        let usercheck =  /^[A-Za-z.]{3,30}$/

        let passwordcheck = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/

        let emailcheck = /^[A-Za-z_0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/
        
    
        if (usercheck.test(firstName)=='') {
          document.getElementById('userFnameError').innerHTML = ('firstname required')
          flag = 1
        } else {
          document.getElementById('userFnameError').innerHTML = ''
        }
    
        if (usercheck.test(lastName) =='') {
          document.getElementById('userLnameError').innerHTML = ('lastName required')
          flag = 1
        } else {
          document.getElementById('userLnameError').innerHTML = ''
        }
    
        if (emailcheck.test(Email) == '') {
          document.getElementById("emailError").innerHTML = ('email required')
          flag = 1
        } else {
          document.getElementById('emailError').innerHTML = ''
        }
    
        if (passwordcheck.test(password) == '') {
          document.getElementById('userPasswordError').innerHTML = ('password required')
          flag = 1
        } else {
          document.getElementById('userPasswordError').innerHTML = ''
        }
    
        if (confirmPassword.match(password)=='') {
          document.getElementById('userCpasswordError').innerHTML = ('incorrect password ')
          flag = 1
        }
    
          else {
          document.getElementById('userCpasswordError').innerHTML = ''
        }
    
        if (flag == 1) {
          return false
        }
    
    
      }



      //adminLoginValidation


       function adminLoginValidation(){
        let flag =0
        let adminName = document.getElementById('name').value.trim()
        let password = document.getElementById('pass').value.trim()

        if(adminName===''){
            document.getElementById('userNameError').innerHTML=('Name required')
            flag=1

        }else {
            document.getElementById('userNameError').innerHTML=''

        }

        if(password==''){
            document.getElementById('passwordError').innerHTML='Password Required'
            flag=1
        }else{
            document.getElementById('passwordError').innerHTML=''

        }

        if(flag==1){
            return false
        }

    }

  
