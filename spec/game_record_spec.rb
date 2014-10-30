require 'rails_helper'

describe GameReport do
  let(:game_report) { GameReport.new }

  it 'belongs to a user' do
    expect(game_report.user).to eq nil
  end

  it 'has level reports' do
    expect(game_report.level_reports.count).to eq 0
  end
end
