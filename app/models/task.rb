class Task < ApplicationRecord
    validates :title, presence: true, length: { minimum: 5 }
    acts_as_taggable
end
