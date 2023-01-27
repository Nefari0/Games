import styled from "styled-components"

export const NavBar = styled.div`
    width:500px;
    display:flex;
    justify-content:space-between;
    margin-top:10px;

    a {
        cursor:pointer;
        font-style: italic;
        text-decoration:none;
        color:blue;
    }

    @media (max-width:550px) {
        width:400px;
    }

    @media (max-width:450px) {
        width:300px;
    }

    @media (max-width:350px) {
        width:200px;
    }
`