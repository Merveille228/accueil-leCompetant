import { Component } from "react"

// Si un effet WebGL plante (téléphone ancien, fichier manquant), le site continue sans lui.
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.error("Effet désactivé :", error)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
