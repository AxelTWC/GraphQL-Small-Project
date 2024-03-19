package seg3x02.lab8apigraphql.repository

import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import seg3x02.lab8apigraphql.entity.user

@Repository
interface userRepository: MongoRepository<user, String>