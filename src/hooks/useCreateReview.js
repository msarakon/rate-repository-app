import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"

const useCreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW)

  const createReview = async review => {
    const { data } = await mutate({ variables: { review } })
    return data.createReview
  }

  return [createReview]
}

export default useCreateReview
