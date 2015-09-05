class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
  before_filter :grab_current_user
  before_filter :grab_users_task, only: [:show, :edit, :update, :destroy]


  def grab_current_user
    @user = current_user
  end

  def grab_users_task
    begin
      @task = @user.tasks.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to user_tasks_url, alert: "Task you requested eihter does not exist or doesn't belong to you" 
    end
  end


  def index
    @tasks_pending = @user.tasks.pending
    @tasks_completed = @user.tasks.completed
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tasks }
    end
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/new
  # GET /tasks/new.json
  def new
    @task = Task.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @task }
    end
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(params[:task])

    respond_to do |format|
      if @task.save
        format.html { redirect_to user_tasks_url, notice: 'Task was successfully created.' }
        format.json { render json: @task, status: :created, location: @task }
      else
        format.html { render action: "new" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tasks/1
  # PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update_attributes(params[:task])
        format.html { redirect_to user_tasks_url, notice: 'Task was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy

    respond_to do |format|
      format.html { redirect_to user_tasks_url }
      format.json { head :no_content }
    end
  end
end
