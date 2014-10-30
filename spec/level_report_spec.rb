require 'rails_helper'

describe LevelReport do
  let(:level_report) { LevelReport.new }

  it 'has all stats initialized to 0' do
    expect(level_report.points).to eq 0
    expect(level_report.completion_time).to eq 0
    expect(level_report.enemies_killed).to eq 0
    expect(level_report.orbs_collected).to eq 0
    expect(level_report.relics_collected).to eq 0
  end

  it 'belongs to a game report' do
    expect(level_report.game_report).to eq nil
  end
end
