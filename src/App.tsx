import AppRoute from './route'
import { Provider } from './context'
function App() {
  return (
    <>
      {/* <Canvas camera={{ position: [0, 100, 30], fov: 75 }}>
        <color attach="background" args={[0xfff0ea]} />
        <Environment preset='sunset' />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <SmallVillage />
        <Sky />
        <Cloads />
        <Cube />
      </Canvas > */}
      <Provider>
        < AppRoute />
      </Provider>
    </>
  )
}
export default App