class Api::V1::TasksController < ApplicationController
    # GET /api/v1/tasks
    def index
        render json: Task.order(:created_at)
    end

    # POST /api/v1/tasks
    def create
        @task = Task.create(task_params)
        render json: @task
    end

    # PATCH, PUT /api/v1/tasks/:id
    def update
        @task = Task.find(params[:id])

        begin
            # Convert string representation of date to DateTime object
            task_params[:due_date] = DateTime.parse(task_params[:due_date])
        rescue TypeError => e
            # If invalid argument (e.g. nil)
            task_params[:due_date] = nil
        end

        @task.update(task_params)
        @task.tag_list = task_params[:tag_list]
        @task.save

        # Ensure that task has latest data that is currently stored in database.
        @task.reload
        render json: @task
    end

    # DELETE /api/v1/tasks/:id
    def destroy
        Task.destroy(params[:id])
    end

    private
    def task_params
        params.require(:task).permit(:id, 
                :title, 
                :description, 
                :completed,
                :due_date,
                # Map the key to an empty array to declare that tag_list must be an array 
                # Array declarations must be at the end of the attributes list, otherwise you'll get a syntax error
                :tag_list => [] 
        )
        
    end
end
