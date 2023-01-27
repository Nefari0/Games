import { NavBar } from "./nav.styles"
import { gitBash } from "./SVG"

const Nav = () => {
    return (
        <NavBar>

            <a
                href='https://github.com/Nefari0/Games'
                target="_blank"
            >
                {gitBash()}
            </a>

            <a
                href='http://chris.madmodels3d.com/'
                target="_blank"
            >
                by Chris deMontigny
            </a>

        </NavBar>
    )
}

export default Nav