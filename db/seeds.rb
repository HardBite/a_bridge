

lorem_ipsum = %q( Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra mi eget est varius, vel pulvinar tortor feugiat. Fusce lectus purus, rhoncus sit amet urna ac, accumsan suscipit mauris. Donec eu sem id magna ultrices gravida nec eu purus. Nulla gravida ante nec elit venenatis, in interdum justo mollis. Vestibulum lacinia, arcu sit amet tristique aliquam, ligula ante volutpat ex, non auctor odio tortor sed ipsum. Sed eu libero est. Cras augue arcu, egestas in sapien nec, efficitur ornare risus. Sed dictum pharetra eros eu mollis. Aenean vitae turpis ac nibh mollis facilisis. Mauris dictum placerat felis ac interdum. Cras eget ante arcu.\r\n
Nam ex lacus, dapibus non gravida non, porttitor sit amet nisl. Nulla volutpat euismod turpis. Sed vestibulum eros eu nunc dictum tincidunt. Etiam sodales velit id tincidunt commodo. Integer laoreet, lorem eu lacinia rhoncus, lorem ligula consectetur ex, vitae finibus massa ipsum quis tellus. Duis venenatis leo vitae vulputate feugiat. Nulla facilisi. Sed quis cursus mi. Fusce venenatis tempus orci. Duis ornare est nec ultrices pharetra. In mattis tortor vel nunc ornare, quis sollicitudin nibh dignissim. Phasellus fermentum dolor consectetur dolor tristique, eu pulvinar neque accumsan. Sed in molestie purus.\r\n
Aenean elit eros, malesuada et dapibus quis, venenatis nec libero. Donec cursus leo nunc, sit amet sollicitudin dolor mattis non. Morbi quis pulvinar magna. Integer tortor justo, dapibus vel commodo id, fermentum eu diam. Praesent faucibus tempus lobortis. Phasellus cursus turpis sit amet dolor rutrum molestie. Aliquam et semper orci. Sed id nisi quis lorem imperdiet porta. Donec consectetur, dolor condimentum elementum ultrices, sapien urna fermentum neque, non porta enim sem eget ligula. Proin consequat vitae metus a aliquet.\r\n)

dates = ['Mon, 05 Sep 2016 12:54:00 UTC +00:00', 'Thu, 08 Sep 2016 18:28:00 UTC +00:00']

priorities = (1..10).to_a

statuses = ['pending', 'completed']

users_id = [2]

adj = ['Important ', 'Unimortant ', 'Dull ', 'Jolly ', 'Cool ', 'Marvellous ']
noun_1 = ['task ', 'job ', 'work ', 'obligation ', 'nesessity ']
verb = ['water ', 'boil ', 'cook ', 'read ', 'paint ', 'wait for ', 'carve ', 'wash ', 'write ', 'polish ']
noun_2 = ['flowers', 'eggs', 'checken', 'garage', 'bus', 'walking stick', 'hands', 'novel', 'boot']

# Due tasks

60.times {
	tit = adj.sample + noun_1.sample + 'to ' + verb.sample + 'the ' + noun_2.sample
Task.create("description"=> lorem_ipsum, "due_date"=>dates.sample,
			 "priority"=> priorities.sample, "status"=>statuses.sample,
			  "title"=>tit, "user_id"=>users_id.sample)
}
