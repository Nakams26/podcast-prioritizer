
//Import components
import TravelForm from "./TravelForm"
import PodcastForm from "./PodcastForm"

//Import state

import { useState } from "react"



const UserSearch = () => {







    return(
    <section className="form">
        <div className="wrapper">
        <form action="">
        <TravelForm/>
        <PodcastForm/>
        <button type='submit'>Submit</button>
        </form>
        </div>
    </section>
    )
}

export default UserSearch