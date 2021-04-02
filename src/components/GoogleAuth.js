import React from 'react';
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component {
    // state = {isSignedIn : null};

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '293660843564-ldra3q1lrt02gi68llj0b9e4apt5hue6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.anu = window.gapi.auth2.getAuthInstance()
                // this.setState({isSignedIn: this.auth.isSignedIn.get()})
                console.log('pertama');
                this.onAuthChange(this.anu.isSignedIn.get())//dijalankan pertama
                console.log('kedua');
                this.anu.isSignedIn.listen(this.onAuthChange)//fungsi ini akan menjalankan onAuthChange jika nilainya berubah (2)
            })
        })
    }
    
    // Action Creator
    onAuthChange = (isSignedIn) => {
        // this.setState({isSignedIn: this.auth.isSignedIn.get()})
        if (isSignedIn) {
            console.log('props login');
            this.props.signIn(this.anu.currentUser.get().getId()) //passing data props ke action  (3)      
        } else{
            console.log('props logout');
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.anu.signIn() //menampilkan popup login google (1)
        console.log('cek lagi');
    }

    onSignOutClick = () => {
        this.anu.signOut()
        console.log('ceklagi2');
    }

    renderAuthButton(){
        if (this.props.isSignedIn === null){
            return null
        }else if(this.props.isSignedIn){ // cek jika props isSignedIn bernilai true
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}><i className="google icon"></i>Sign Out</button>
            )
        }else {
            return (
                <button className="ui red google button" onClick={this.onSignInClick}><i className="google icon"></i>Sign In with Google</button>
            )
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn} //isi nilai props isSignedIn dari reducer(auth.isSignedIn)(5)
}

export default connect(mapStateToProps, {signIn : signIn, signOut:signOut})( GoogleAuth) //4

// 1.  Penjelasan alur redux :
// pada baris 16(componentdidmount), fungsi onauthChange dijalankan menghasilkan props SignIn() atau SignOut() (Baris 22), lalu di baris 66 props tersebut dideklarasikan sebagai object yang konek dengan file action yg mengembalikan type (Sign In atau Sign Out),  lalu reducer akan memeriksa jika action yg dikirim sesuai type dari action nya, jika Sign_In maka update state IsSignedIn === True, begitu sebaliknya. sebagai gambaran alur file sbb:

// Alur 
// 1. Googleauth.js(action creator)(cdm) -> actions -> reducers -> state
// 2. button sign/signout di klik -> action -> reducers -> State(berubah)-> reRender component

// 2.  Penjelasan State
// lalu pada baris ke 69(mapStateToProps) menberikan nilai props.isSignedIn yaitu state.auth.isSignedIn(auth = diambil dari combineReducer file index.js reducer), jadi nilai dari reducer akan diupdate kembail ke file googleauth melalui props.isSignedIn(baris 66)


// 3. Render renderauthbutton
// fungsi ini akan melihat props.isSignedIn jika bernilai TRUE maka tampilkan button SignOut jika FALSE tampilkan button Sign In with google

// 4. Action Button Sign In dan SignOut di klik
// ketika button Sign In dan Sign Out di klik maka akan dieksekusi baris 33-41 dan akan merender ulang RenderAuth Button jika props.IsSignedIn berubah nilai true atau false dari reducer, bahasa singkatnya akan Rerender ulang dari redux ke component button