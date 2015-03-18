# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141103031815) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "game_reports", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "level_reports", force: true do |t|
    t.integer  "points",           default: 0
    t.integer  "completion_time",  default: 0
    t.integer  "enemies_killed",   default: 0
    t.integer  "orbs_collected",   default: 0
    t.integer  "relics_collected", default: 0
    t.integer  "game_report_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "opponent"
    t.integer  "opponent_score"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "password_digest"
    t.string   "email"
    t.integer  "key_left"
    t.integer  "key_right"
    t.integer  "key_up"
    t.integer  "key_down"
    t.integer  "key_jump"
    t.integer  "key_shoot"
    t.integer  "key_switch"
    t.integer  "key_pause"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "welcomes", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
