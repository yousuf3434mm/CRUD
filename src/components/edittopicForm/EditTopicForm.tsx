import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const EditTopicForm = () => {
  return (
        <form>
            <Input
                type="text"
                placeholder="Topic Title"
                className="mb-4 w-full p-2 border border-gray-300 rounded-md" />


            <Input
                type="text"
                placeholder="Topic Description"
                className="mb-4 w-full p-2 border border-gray-300 rounded-md" />
            <Button
                type="submit"
                className="w-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
                Update Topic </Button>
        </form>
    )
}

export default EditTopicForm
