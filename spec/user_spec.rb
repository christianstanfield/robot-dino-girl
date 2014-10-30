require 'rails_helper'

describe User do
  let(:user) { User.new }
  let(:user2) { User.new }

  it "is invalid without a username" do
    user.update_attributes(password: 'password', email: "test@gmail.com")
    expect(user).to be_invalid
  end

  it "is invalid without a unique username" do
    user.update_attributes(username: 'test', password: 'password', email: "test@gmail.com")
    user.save
    expect(user).to be_valid
    user2.update_attributes(username: 'test', password: 'password', email: "test@gmail.com")
    user2.save
    expect(user2).to be_invalid
  end

  it "is invalid without a password" do
    user.update_attributes(username: 'test', email: "test@gmail.com")
    expect(user).to be_invalid
  end

  it "is invalid without a valid email" do
    user.update_attributes(username: 'b', password: 'password', email: "testgmail.com")
    expect(user).to be_invalid
  end

  it 'has game reports' do
    expect(user.game_reports.count).to eq 0
  end

  it 'has level reports' do
    expect(user.level_reports.count).to eq 0
  end
end
