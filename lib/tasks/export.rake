namespace :export do
  desc "Prints Task.all in a seeds.rb way."
  task :seeds_format => :environment do
    Task.order(:id).all.each do |task|
      puts "Task.create(#{task.serializable_hash.delete_if {|key, value| ['created_at','updated_at','id'].include?(key)}.to_s.gsub(/[{}]/,'')})"
    end
  end
end