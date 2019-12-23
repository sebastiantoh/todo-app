class Api::V1::TasksController < ApplicationController
    def index
        render json: Task.all
    end

    def create
        @task = Task.create(task_params)
        render json: @task
    end

    def update
        @task = Task.find(params[:id])
        @task.update_attributes(task_params)
        @task.tag_list = task_params[:tag_list]
        @task.save
        @task.reload
        render json: @task
    end

    def destroy
        Task.destroy(params[:id])
    end

    private
    def task_params
        params.require(:task).permit(:title, :description, :tag_list => [])
    end
end
