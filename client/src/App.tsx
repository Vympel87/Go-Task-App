import { Container, Stack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export const BASE_URL = "http://localhost:8000/api"

function App() {

  return (
    <Stack h="100vh">
      <Navbar />
      <Container>
        <TaskForm />
        <TaskList />
      </Container>
    </Stack>
  )
}

export default App
