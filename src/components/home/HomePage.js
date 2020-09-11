import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { removeCharacterAction } from '../../redux/charstDucks'

function Home({ chars, removeCharacterAction }) {
  function renderCharacter() {
    let char = chars[0]
    return <Card leftClick={removeCharacterAction} {...char} />
  }
  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  )
}

function mapState(state) {
  return {
    chars: state.characters.array,
  }
}

export default connect(mapState, { removeCharacterAction })(Home)
