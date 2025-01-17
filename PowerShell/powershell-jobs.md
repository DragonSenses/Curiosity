# Put lengthy tasks in the background using PowerShell jobs

Using PowerShell jobs allows you to run lengthy tasks in the background, so you can continue with other work 
without waiting for the task to complete. 

Here's an overview of the key cmdlets you'll use: `Start-Job`, `Get-Job`, `Receive-Job`, `Stop-Job`, and `Remove-Job`.

### 1. Start-Job
Use `Start-Job` to initiate a background job. Here's how you start a job:

```powershell
# Start a background job to run a script block
$job = Start-Job -ScriptBlock {
    # Your lengthy task here
    Start-Sleep -Seconds 60
    Get-Process
}
```

### 2. Get-Job
Use `Get-Job` to retrieve information about jobs that are running or have completed. It lists all background jobs started in the current session.

```powershell
# List all jobs
Get-Job
```

### 3. Receive-Job
Once a job is completed, use `Receive-Job` to get the output of the job. By default, this cmdlet retrieves the results of a job and deletes them from the job.

```powershell
# Retrieve the output of a job
Receive-Job -Job $job
```

### 4. Stop-Job
If you need to stop a running job, use `Stop-Job`.

```powershell
# Stop a job
Stop-Job -Job $job
```

### 5. Remove-Job
Finally, use `Remove-Job` to delete a job from the session. This is useful for cleanup after the job is done.

```powershell
# Remove a job
Remove-Job -Job $job
```

### Example Workflow
Here's a complete example to demonstrate these cmdlets in action:

```powershell
# Start a background job
$job = Start-Job -ScriptBlock {
    # Simulate a lengthy task
    Start-Sleep -Seconds 60
    "Task completed"
}

# Check the status of the job
Get-Job

# Wait for the job to complete
Wait-Job -Job $job

# Get the result of the job
$result = Receive-Job -Job $job
Write-Host "Job Result: $result"

# Remove the job from the session
Remove-Job -Job $job
```

This example starts a job that sleeps for 60 seconds, retrieves the status of the job, waits for it to complete, retrieves the result, and finally removes the job.

### Additional Tips
- **Using Job Names**: You can assign names to your jobs for easier identification.
  
    ```powershell
    Start-Job -Name "ExampleJob" -ScriptBlock { Start-Sleep -Seconds 60; "Task completed" }
    ```

- **Job Output**: If the job produces output, you can store and process it as needed.
- **Job Persistence**: Jobs are session-specific. If you close the PowerShell session, the jobs are lost.

PowerShell jobs are a powerful way to manage background tasks, making your workflow more efficient.
