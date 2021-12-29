import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations"

const useSignUp = () => {
  const [mutate] = useMutation(CREATE_USER)

  const signUp = async user => mutate({ variables: { user } })

  return [signUp]
}

export default useSignUp
