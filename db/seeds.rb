# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
GameReport.delete_all
LevelReport.delete_all

usernames = ['username'] + Array.new(4) { Faker::Internet.user_name }
usernames.each do |username|
  user = User.create!(username: username,
                      password: 'password',
                      email: Faker::Internet.email)
  rand(1..5).times do
    game_report = user.game_reports.create!
    rand(2..10).times do
      level_report = game_report.level_reports.create!(points: rand(0..10000),
                                                       completion_time: rand(500..100000),
                                                       enemies_killed: rand(2..100),
                                                       orbs_collected: rand(3..30),
                                                       relics_collected: rand(0..5))
    end
  end
end
