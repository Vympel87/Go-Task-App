import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { BASE_URL } from "../App";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskForm = () => {
	const [newTask, setNewTask] = useState("");

    const queryClient = useQueryClient();

	const { mutate: createTask, isPending: isCreating } = useMutation({
		mutationKey: ["createTask"],
		mutationFn: async (e: React.FormEvent) => {
			e.preventDefault();
			try {
				const res = await fetch(BASE_URL + `/task`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ body: newTask }),
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				setNewTask("");
				return data;
			} catch (error: any) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
		onError: (error: any) => {
			alert(error.message);
		},
	});

	return (
		<form onSubmit={createTask}>
			<Flex gap={2}>
				<Input
					type='text'
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					ref={(input) => input && input.focus()}
				/>
				<Button
					mx={2}
					type='submit'
					_active={{
						transform: "scale(.97)",
					}}
				>
					{isCreating ? <Spinner size={"xs"} /> : <IoMdAdd size={30} />}
				</Button>
			</Flex>
		</form>
	);
};
export default TaskForm;