function Header(props){
    return(
        <div>
            
            <h1> {props.name} </h1>
            <p> {props.subtitle}</p>
        </div>
    );
}
export default Header