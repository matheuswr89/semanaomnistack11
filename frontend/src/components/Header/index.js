/* eslint-disable react/prop-types */
import React from 'react'
import ThemeSwitcher from 'react-theme-switcher';

import { Container } from './styles'

import logo from '../../assets/logo.svg';

export default function Header({ toggleTheme }) {
  return (
    <Container>
      <img src={logo} alt="Be The Hero" width={90} />
      <ThemeSwitcher
          cssSelector="body"
          switcherColor="#2775cc"
          darkColor="#282c34"
          lightColor="#f0f0f5"
          lightTextColor="#272b33"
          darkTextColor="#f0f0f5" />
    </Container>
  )
}