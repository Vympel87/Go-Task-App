import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TaskItem from "./TaskItem.tsx";
import { useQuery } from "@tanstack/react-query";

export type Task = {
    _id: number;
    body: string;
    completed: boolean;
}

const TaskList = () => {
    const {data:tasks, isLoading} = useQuery<Task[]>({
        queryKey: ["tasks"],
        
        queryFn: async () => {
            try {
                const res = await fetch("http://localhost:8000/api/task")
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "something went wrong");
                }
                return data || []
            } catch (error) {
                console.log(error)
            }
        }
    })
	return (
		<>
			<Text fontSize={"4xl"} textTransform={"uppercase"} fontWeight={"bold"} textAlign={"center"} my={2}>
				Today's Tasks
			</Text>
			{isLoading && (
				<Flex justifyContent={"center"} my={4}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && tasks?.length === 0 && (
				<Stack alignItems={"center"} gap='3'>
					<Text fontSize={"xl"} textAlign={"center"} color={"gray.500"}>
						All tasks completed! 👍
					</Text>
				</Stack>
			)}
			<Stack gap={3}>
				{tasks?.map((task) => (
					<TaskItem key={task._id} task={task} />
				))}
			</Stack>
		</>
	);
};
export default TaskList;