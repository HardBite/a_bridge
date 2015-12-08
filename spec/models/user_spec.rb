require 'spec_helper'



describe User do
	
	before(:each) do
		@valid_user=User.new(first_name: 'John', last_name: 'Doe',
					email: 'email@mail.ma', password: 'more_then_8_chars_length',
					password_confirmation: 'more_then_8_chars_length')
	end

	it "has a working full_name method" do
		expect(@valid_user.full_name()).to eq('John Doe')
	end
	
		
	it "passes validations with valid data" do
		expect(@valid_user).to be_valid
	end

	it "is invalid w/o first_name" do
		@valid_user.first_name = ''
		expect(@valid_user).not_to be_valid
	end

	it "is invalid w/o last_name" do
		@valid_user.last_name = ''
		expect(@valid_user).not_to be_valid
	end

	it "is invalid with invalid e-mail" do
		@valid_user.email = 'now_at_sign_here'
		expect(@valid_user).not_to be_valid
	end

	it "is invalid with short password" do
		@valid_user.password = '1234567'
		expect(@valid_user).not_to be_valid
	end

end