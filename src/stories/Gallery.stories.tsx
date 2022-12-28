import React from "react"
import { Gallery } from "../Gallery"
import { storiesOf } from "@storybook/react"


const stories = storiesOf("Gallery", module)

stories.add("Default", () => {
    return <Gallery />
})
